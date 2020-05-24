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

const client = {
    login: (username, password) => {

    },
    logout: () => {

    },
    getCountryTotals: () => {
        return Promise.resolve({
            "positive_tests": 1424,
            "total_tested": 2425,
            "recovered": 546,
            "deaths": 985
        })
    },
    getStateList: () => {
        return Promise.resolve(stateList);
    },
    getSubscriptions: () => {
        return Promise.resolve(subs);
    },
    getAllCurrent: () => {
        return Promise.resolve(allCurrent);
    },
    getSubsCurrent: () => {
        return Promise.resolve(subsCurrent);
    },
    setSubscriptions: (subs) => {
        return Promise.resolve();
    }
}

export default client;