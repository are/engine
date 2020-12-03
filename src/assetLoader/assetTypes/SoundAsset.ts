import { Asset } from '../Asset'
import { AssetDefinition, AssetType } from '../AssetDefinition'

export class SoundAsset extends Asset {
  type = AssetType.image

  constructor(definition: AssetDefinition, public audio: HTMLAudioElement) {
    super(definition)
  }
}
