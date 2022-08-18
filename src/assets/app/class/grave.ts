import { uniqueNamesGenerator, adjectives, countries, names, languages } from 'unique-names-generator';
import graveData from '../data/grave/graveData';

export interface Tomb {
    name: string;   // Tomb 1, 2, 3?
    decoration: string; // Sparsely decorated, lavishly decorated
    engraving: string; // So, and so blah blah blah
    feature: string; // Dirt is loose (Graverobbed before)
}

export class Grave implements Tomb {
    private _name!: string;   
    private _decoration!: string; 
    private _engraving!: string;
    private _feature!: string;

    private static _nameArray: string[];
    private static _decorationArray: string[];    
    private static _featureArray: string[];

    constructor({name, decoration, engraving, feature}: Tomb){
        this.name = name;
        this.decoration = decoration;
        this.engraving = engraving;
        this.feature = feature;
    }

    clone(){
        return new Grave(this);
    }

    // Return a code string that will create a new instance containing our
	// own data.
	//
	// NOTE: Supplying `this` directly as the `reviveData` parameter to the
	// `JSON.reviveWrapper()` call will trigger out of control recursion in
	// the serializer, so we must pass it a clone of our own data instead.
    toJson(){
	    return JSON.reviveWrapper('new setup.Grave($ReviveData$)', clone(this));
    }

    public static generator(){
        let tombName = Grave.tombNameGenerator();
        let tombDecoration = Grave.tombDecorationGenerator();
        let tombEngraving = Grave.tombEngravingGenerator();
        let tombFeature = Grave.tombFeatureGenerator();

        return new Grave({name: tombName, decoration: tombDecoration, engraving: tombEngraving, feature: tombFeature });
    }

    private static tombNameGenerator(): string{
        const tombName: string = uniqueNamesGenerator({
            dictionaries: [Grave.nameArray]
          });
        return tombName;
    }

    private static tombDecorationGenerator(){
        const tombDecoration: string = uniqueNamesGenerator({
            dictionaries: [Grave.decorationArray]
          });
        return tombDecoration;
    }

    private static tombEngravingGenerator(){
        const tombEngraving: string = uniqueNamesGenerator({
            dictionaries: [adjectives, countries, languages, names],
            length: 4,
            separator: ' '
          });
        return tombEngraving;
    }
    
    private static tombFeatureGenerator(){
        const tombFeature: string = uniqueNamesGenerator({
            dictionaries: [Grave.featureArray]
        });
        return tombFeature;
    }


    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get decoration(): string {
        return this._decoration;
    }
    public set decoration(value: string) {
        this._decoration = value;
    }

    public get engraving(): string {
        return this._engraving;
    }
    public set engraving(value: string) {
        this._engraving = value;
    }

    public get feature(): string {
        return this._feature;
    }
    public set feature(value: string) {
        this._feature = value;
    }

    private static get nameArray(): string[] {
        if (Grave._nameArray === undefined) {
            Grave._nameArray = graveData.graveName;
        }
        return Grave._nameArray;
    }
    private static set nameArray(value: string[]) {
        Grave._nameArray = value;
    }

    private static get decorationArray(): string[] {
        if (Grave._decorationArray === undefined) {
            Grave._decorationArray = graveData.graveDecoration;
        }
        return Grave._decorationArray;
    }
    private static set decorationArray(value: string[]) {
        Grave._decorationArray = value;
    }

    private static get featureArray(): string[] {
        if (Grave._featureArray === undefined) {
            Grave._featureArray = graveData.graveFeature;
        }
        return Grave._featureArray;
    }
    private static set featureArray(value: string[]) {
        Grave._featureArray = value;
    }
} 