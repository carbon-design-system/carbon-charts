export const isRTL = window["isRTL"]

export const demoLabels = isRTL ?
	["مقدار", "مازاد", "فروش", "تهیه", "متفرقه"] :
	["Qty", "More", "Sold", "Restocking", "Misc"];

export const demoPieDonutLabels = isRTL ?
	["محصول اول", "محصول دوم", "محصول سوم", "محصول چهارم", "محصول پنجم", "محصول ششم", "محصول هفتم", "محصول هشتم", "محصول نهم", "محصول دهم", "محصول یازدهم"] :
	["2V2N-9KYPM version 1", "L22I-P66EP-L22I-P66EP-L22I-P66EP", "JQAI-2M4L1", "J9DZ-F37AP",
	"YEL48-Q6XK-YEL48", "P66EP-L22I-L22I", "Q6XK-YEL48", "XKB5-L6EP", "YEL48-Q6XK", "L22I-P66EP-L22I"];

export const demoDatasetLabels = isRTL ?
	["مجموعه داده ۱", "مجموعه داده ۲", "مجموعه داده ۳", "مجموعه داده ۴"] :
	["Dataset 1", "Dataset 2", "Dataset 3", "Dataset 4"];

export const demoYAxisTitle = isRTL ?
	"دلار (کانادا)" : "Dollars (CAD)";

export const demoXAxisTitle = isRTL ?
	"فروش سالانه ۲۰۱۸" : "2018 Annual Sales Figures";

export const demoYAxisFormatter = isRTL ?
	axisValue => `${axisValue / 1000}هزار` :
	axisValue => `${axisValue / 1000}k`;

export const demoY2AxisFormatter = isRTL ?
	axisValue => `٪${axisValue * 100}` :
	axisValue => `${axisValue * 100}%`;

export const demoDonutCenterLabel = isRTL ? "محصولات" : "Products"

export const demoPieDonutOtherLabel = isRTL ? "متفرقه" : "Other"
