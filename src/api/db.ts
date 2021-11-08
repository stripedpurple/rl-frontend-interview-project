let __loadedTransactions = false;
const db: { cache: {[key: string]: any}; getTransactions: Function; setTransactions: Function; request: Function; } = {
    cache: {},

    getTransactions: function(callback: (transactions: transaction_record[]) => any): void {
        if (__loadedTransactions)
            return

        let endpoint: string = 'transactions';
        db.request('GET', endpoint, function(xhr: XMLHttpRequest): void {

            const key: string = 'transactions';
            const status: number = xhr.status;
            let transactions: transaction_record[] = [];
            switch (status) {
                case 200:
                    const response: string = xhr.response;
                    transactions = JSON.parse(response);
                    db.cache[key] = transactions;
                    localStorage.setItem(key, JSON.stringify(transactions));
                    __loadedTransactions = true;
                    break
                case 304:
                    transactions = db.cache[key];
                    if (!transactions) {
                        let transactions_string = localStorage.getItem(key);
                        if (typeof transactions_string === 'string')
                            transactions = JSON.parse(transactions_string);
                        else
                            transactions = [];
                    }
            };

            if (typeof callback === 'function')
                callback(transactions);
        });
    },

    setTransactions: function(value: transaction_record, callback: (status: number) => any) {
        if (value && value.description.replace(/\s/g, '').length > 0 && isFinite(+value.expense)) {
            let endpoint: string = 'transactions';
            db.request('POST', endpoint, JSON.stringify(value), function(xhr: XMLHttpRequest) {
                __loadedTransactions = false;
                if (callback)
                    callback(xhr.status);
            })
        }
    },

    request: function(method: string, endpoint: string, value: (xhr: XMLHttpRequest) => any | string, callback: (xhr: XMLHttpRequest) => any): void {
        if (!method || !endpoint)
            throw Error('Unable to send request. Please specify and request method and endpoint.');
        else if (method !== 'GET' && method !== 'POST')
            throw Error('Request method must be either GET or POST.');

        if (value && typeof value !== 'string' && typeof value === 'function')
            callback = value;

        const url = 'http://localhost:3001/' + endpoint;
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('content-type', 'application/json');
        if (callback)
            xhr.onload = () => callback(xhr);

        if (typeof value === 'string')
            xhr.send(value);
        else
            xhr.send();
    }
}; export default db;

export interface transaction_record {
    id: number;
    description: string;
    expense: string;
}