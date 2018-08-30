export default class PatternsService {
    container: any;
    patternAccum: number;
    idAccum: number;
    patternURLs: {};
    constructor();
    /**
     * Sets the container div for pattern SVGs in DOM
     *
     * @memberof PatternsService
     */
    setDiv(): void;
    /**
     * Adds all the pattern SVGs to the container div, applying a unique ID to each one
     *
     * @memberof PatternsService
     */
    addPatternSVGs(d: any, colorScale: any, chartContainerID: string, legendType: string): void;
    getFillValues(): {};
}
