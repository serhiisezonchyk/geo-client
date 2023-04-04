import { makeAutoObservable } from "mobx";

export default class LayersStore {
  constructor() {
    this._layers = [];
    makeAutoObservable(this);
  }

  get layers() {
    return this._layers;
  }

  setLayer(name, checked) {
    this._layers[name] = checked;
  }

  getLayer(name){
    return this._layers[name];
  }

  setLayers(layers){
    this._layers = layers;
  }
  
}
