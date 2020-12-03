import { Asset } from './Asset'
import { AssetDefinition, AssetType } from './AssetDefinition'

import { ImageAsset, SoundAsset } from './assetTypes'

export class AssetMap {
  constructor(private map: Record<string, Asset>) {}

  get<T extends Asset>(name: string) {
    return this.map[name] as T
  }
}

export class AssetLoader {
  private cache: Map<string, Map<AssetType, Asset>> = new Map()

  async loadAssetMap(
    assetMap: Record<string, AssetDefinition>,
    onProgress: (percentageLoaded: number) => void = () => {}
  ): Promise<AssetMap> {
    const totalAmount = Object.keys(assetMap).length
    let currentAmount = 0

    const updateProgress = () => {
      currentAmount += 1

      onProgress(currentAmount / totalAmount)
    }

    onProgress(0)

    return new AssetMap(
      Object.fromEntries(
        await Promise.all(
          Object.entries(assetMap).map(([name, assetDef]) => {
            return this.loadAsset(assetDef).then(asset => {
              updateProgress()

              return [name, asset]
            })
          })
        )
      )
    )
  }

  async loadAsset<T extends Asset>(
    assetDefinition: AssetDefinition
  ): Promise<T> {
    let asset: Asset | null = null

    const assetMap = this.cache.get(assetDefinition.source) ?? new Map()

    if (assetMap.has(assetDefinition.type)) {
      asset = assetMap.get(assetDefinition.type)
    }

    if (asset !== null) {
      return (asset as unknown) as T
    }

    switch (assetDefinition.type) {
      case AssetType.image:
        asset = await this.loadImageAsset(assetDefinition)
        break
      case AssetType.sound:
        asset = await this.loadSoundAsset(assetDefinition)
        break
      default:
        throw new Error(`Unknown asset type: '${assetDefinition.type}'`)
    }

    assetMap.set(assetDefinition.type, asset)
    this.cache.set(assetDefinition.source, assetMap)

    return (asset as unknown) as T
  }

  private loadImageAsset(
    assetDefinition: AssetDefinition
  ): Promise<ImageAsset> {
    const imageElement = new Image()

    return new Promise((resolve, reject) => {
      imageElement.addEventListener('error', reject, { once: true })
      imageElement.addEventListener(
        'load',
        () => {
          resolve(new ImageAsset(assetDefinition, imageElement))
        },
        { once: true }
      )

      imageElement.src = assetDefinition.source
    })
  }

  private loadSoundAsset(
    assetDefinition: AssetDefinition
  ): Promise<SoundAsset> {
    const soundElement = new Audio()

    return new Promise((resolve, reject) => {
      soundElement.addEventListener('error', reject, { once: true })
      soundElement.addEventListener(
        'canplaythrough',
        () => {
          resolve(new SoundAsset(assetDefinition, soundElement))
        },
        { once: true }
      )

      soundElement.src = assetDefinition.source
    })
  }
}
