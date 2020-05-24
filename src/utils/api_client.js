const stateList = [
    {
        code: "FL",
        name: "Florida",
    },
    {
        code: "NC",
        name: "North Carolina",
    },
    {
        code: "CA",
        name: "California",
    },
    {
        code: "VA",
        name: "Virginia",
    },
    {
        code: "MD",
        name: "Maryland",
    },
    {
        code: "GA",
        name: "Georgia",
    }
];

const subs = ["FL", "NC"];

const allCurrent = [
    {
        "state_code": "FL",
        "state_name": "Florida",
        "positive_tests": 1824,
        "total_tested": 3425,
        "recovered": 746,
        "deaths": 1485
    },
    {
        "state_code": "NC",
        "state_name": "North Carolina",
        "positive_tests": 1424,
        "total_tested": 2425,
        "recovered": 546,
        "deaths": 985
    },
    {
        "state_code": "CA",
        "state_name": "California",
        "positive_tests": 2534,
        "total_tested": 5425,
        "recovered": 1346,
        "deaths": 2564
    },
    {
        "state_code": "VA",
        "state_name": "Virginia",
        "positive_tests": 2125,
        "total_tested": 4525,
        "recovered": 1746,
        "deaths": 835
    },
    {
        "state_code": "MD",
        "state_name": "Maryland",
        "positive_tests": 1824,
        "total_tested": 3425,
        "recovered": 746,
        "deaths": 1485
    },
    {
        "state_code": "GA",
        "state_name": "Georgia",
        "positive_tests": 1824,
        "total_tested": 3425,
        "recovered": 746,
        "deaths": 1485
    }
];

const subsCurrent = [
    {
        "state_code": "FL",
        "state_name": "Florida",
        "positive_tests": 1824,
        "total_tested": 3425,
        "recovered": 746,
        "deaths": 1485
    },
    {
        "state_code": "NC",
        "state_name": "North Carolina",
        "positive_tests": 1424,
        "total_tested": 2425,
        "recovered": 546,
        "deaths": 985
    },
];

export class AuthError extends Error {}
export class RequestError extends Error {}

const client = {
    login: (username, password) => {
        return fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          }).then((res) => {
            if (!res.ok) {
                throw new RequestError('Req Error');
            }
            else {
                return res;
            }
        });
    },
    logout: () => {
        return fetch('/logout', { method: 'POST' }).then((res) => {
            if (!res.ok) {
                throw new RequestError('Req Error');
            }
            else {
                return res;
            }
        });
    },
    getUser: () => {
        return fetch('/user').then((res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    throw new AuthError('Auth Error');
                }
                else {
                    throw new RequestError('Req Error');
                }
            }
            else {
                return res.json();
            }
        });
    },
    getCountryTotals: () => {
        return fetch('/current/us').then((res) => res.json());
    },
    getStateList: () => {
        return Promise.resolve(stateList);
    },
    getSubscriptions: () => {
        return fetch('/user').then((res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    throw new AuthError('Auth Error');
                }
                else {
                    throw new RequestError('Req Error');
                }
            }
            else {
                return res.json().subscriptions;
            }
        });
    },
    getAllCurrent: () => {
        // return Promise.resolve(allCurrent);
        return fetch('/current/states').then((res) => res.json());
    },
    getSubsCurrent: () => {
        return Promise.resolve([]);
        // return fetch('/user/subscriptions/current').then((res) => {
        //     if (!res.ok) {
        //         if (res.status === 401) {
        //             throw new AuthError('Auth Error');
        //         }
        //         else {
        //             throw new RequestError('Req Error');
        //         }
        //     }
        //     else {
        //         return res.json().data;
        //     }
        // });
    },
    setSubscriptions: (subs) => {
        return Promise.resolve();
    }
}

export default client;