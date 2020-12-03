import { AssetDefinition, AssetType } from './AssetDefinition'

export abstract class Asset {
  type: AssetType

  constructor(public definition: AssetDefinition) {}

  static image(source: string): AssetDefinition {
    return new AssetDefinition(AssetType.image, source)
  }

  static sound(source: string): AssetDefinition {
    return new AssetDefinition(AssetType.sound, source)
  }
}
