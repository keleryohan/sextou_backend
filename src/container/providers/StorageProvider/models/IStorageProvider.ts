export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
}