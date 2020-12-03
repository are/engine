export enum AssetType {
  image,
  sound,
}

export class AssetDefinition {
  constructor(public type: AssetType, public source: string) {}
}
