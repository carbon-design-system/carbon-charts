const isRTL = window["isRTL"]

export const demoLabels = isRTL ?
	["مقدار", "مازاد", "فروش", "تهیه", "متفرقه"] :
	["Qty", "More", "Sold", "Restocking", "Misc"];

export const demoDatasetLabels = isRTL ?
	["مجموعه داده ۱", "مجموعه داده ۲", "مجموعه داده ۳", "مجموعه داده ۴"] :
	["Dataset 1", "Dataset 2", "Dataset 3", "Dataset 4"];

export const demoYAxisTitle = isRTL ?
	"دلار (کانادا)" : "Dollars (CAD)";

export const demoXAxisTitle = isRTL ?
	"فروش سالانه ۲۰۱۸" : "2018 Annual Sales Figures";