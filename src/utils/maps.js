import Plotly from 'plotly.js-dist'

const mapFunctions = {
    usa: (targetEl, stateData) => {

        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        var data = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: unpack(stateData, 'state_code'),
            z: unpack(stateData, 'positive_tests'),
            text: unpack(stateData, 'state_name'),
            colorscale: [
                [0, 'rgb(0, 145, 250)'], [0.2, 'rgb(0,250,25)'],
                [0.4, 'rgb(145,255,0)'], [0.6, 'rgb(255,255,0)'],
                [0.8, 'rgb(255,145,0)'], [1, 'rgb(255,25,0)']
            ],
            colorbar: {
                title: 'Positive Tests',
                thickness: 5,
            },
        }];

        var layout = {
            geo:{
                scope: 'usa',
            }
        };
        
        Plotly.purge(targetEl);

        Plotly.newPlot(targetEl, data, layout, {showLink: false});
    }
}

export default mapFunctions;