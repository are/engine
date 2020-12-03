import { Asset } from '../Asset'
import { AssetDefinition, AssetType } from '../AssetDefinition'

export class ImageAsset extends Asset {
  type = AssetType.image

  constructor(definition: AssetDefinition, public image: HTMLImageElement) {
    super(definition)
  }
}
