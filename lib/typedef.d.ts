export type PredictionResult = {
    data?: [
        string,
        {
            name: string;
            data?: string;
            is_file: boolean;
            orig_name: string;
        }
    ];
    endpoint: string;
    fn_index: number;
};
