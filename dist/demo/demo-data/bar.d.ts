export declare const groupedBarData: {
    labels: string[];
    datasets: {
        label: string;
        backgroundColors: string[];
        data: number[];
    }[];
};
export declare const groupedBarOptions: {
    scales: {
        x: {
            title: string;
        };
        y: {
            formatter: (axisValue: any) => string;
            yMaxAdjuster: (yMaxValue: any) => number;
        };
        y2: {
            ticks: {
                max: number;
                min: number;
            };
            formatter: (axisValue: any) => string;
        };
    };
    legendClickable: boolean;
    containerResizable: boolean;
};
export declare const simpleBarData: {
    labels: string[];
    datasets: {
        label: string;
        backgroundColors: string[];
        data: number[];
    }[];
};
export declare const simpleBarOptions: {
    accessibility: boolean;
    scales: {
        x: {
            title: string;
        };
        y: {
            formatter: (axisValue: any) => string;
            yMaxAdjuster: (yMaxValue: any) => number;
            stacked: boolean;
        };
    };
    legendClickable: boolean;
    containerResizable: boolean;
};
export declare const stackedBarData: {
    labels: string[];
    datasets: {
        label: string;
        backgroundColors: string[];
        data: number[];
    }[];
};
export declare const stackedBarOptions: {
    accessibility: boolean;
    scales: {
        x: {
            title: string;
        };
        y: {
            formatter: (axisValue: any) => string;
            yMaxAdjuster: (yMaxValue: any) => number;
            stacked: boolean;
        };
    };
    legendClickable: boolean;
    containerResizable: boolean;
};
