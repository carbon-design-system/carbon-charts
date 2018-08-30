export declare const curvedLineData: {
    labels: string[];
    datasets: {
        label: string;
        backgroundColors: string[];
        data: number[];
    }[];
};
export declare const curvedLineOptions: {
    accessibility: boolean;
    scales: {
        x: {
            title: string;
        };
        y: {
            formatter: (axisValue: any) => string;
        };
        y2: {
            ticks: {
                max: number;
                min: number;
            };
        };
    };
    curve: string;
    legendClickable: boolean;
    containerResizable: boolean;
};
export declare const lineData: {
    labels: string[];
    datasets: {
        label: string;
        backgroundColors: string[];
        data: number[];
    }[];
};
export declare const lineOptions: {
    accessibility: boolean;
    scales: {
        x: {
            title: string;
        };
        y: {
            formatter: (axisValue: any) => string;
        };
    };
    legendClickable: boolean;
    containerResizable: boolean;
};
