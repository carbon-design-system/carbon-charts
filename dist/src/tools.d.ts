export declare namespace Tools {
    function debounce(func: any, wait: any, immediate: any): () => void;
    function addCloseBtn(tooltip: any, size: any, color?: any): any;
    function clone(obj: any): any;
    /**************************************
     *  DOM-related operations            *
     *************************************/
    /**
     * Get width & height of an element
     *
     * @export
     * @param {any} el element to get dimensions from
     * @returns an object containing the width and height of el
     */
    function getDimensions(el: any): {
        width: number;
        height: number;
    };
    /**************************************
     *  Formatting & calculations         *
     *************************************/
    /**
     * Capitalizes first letter of a string
     *
     * @export
     * @param {any} string the string whose first letter you'd like to capitalize
     * @returns The input string with its first letter capitalized
     */
    function capitalizeFirstLetter(string: any): any;
    /**
     * Get the percentage of a datapoint compared to the entire data-set
     *
     * @export
     * @param {any} item
     * @param {any} fullData
     * @returns The percentage in the form of a string "87%"
     */
    function convertValueToPercentage(item: any, fullData: any): string;
    /**************************************
     *  Object/array related checks       *
     *************************************/
    /**
     * Get the difference between two arrays' items
     *
     * @export
     * @param {any[]} oldArray
     * @param {any[]} newArray
     * @returns The items missing in newArray from oldArray, and items added to newArray compared to oldArray
     */
    function arrayDifferences(oldArray: any[], newArray: any[]): {
        missing: any[];
        added: any[];
    };
    /**
     * Lists out the duplicated keys in an array of data
     *
     * @export
     * @param {*} data - array of data
     * @returns A list of the duplicated keys in data
     */
    function getDuplicateValues(arr: any): any[];
    function removeArrayDuplicates(arr: any): any[];
    /**
     * In D3, moves an element to the front of the canvas
     *
     * @export
     * @param {any} element
     * @returns The function to be used by D3 to push element to the top of the canvas
     */
    function moveToFront(element: any): any;
    /**
     * Retrieves the element transform matrix string, and returns the translateX string
     *
     * @export
     * @param {HTMLElement} element
     * @returns The translateX value for element
     */
    function getXTransformsValue(element: HTMLElement): string;
}
