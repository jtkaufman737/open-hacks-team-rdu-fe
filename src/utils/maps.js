import Plotly from 'plotly.js-dist'

const mapFunctions = {
    usa: (targetEl) => {

        Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv', function(err, rows){
                function unpack(rows, key) {
                    return rows.map(function(row) { return row[key]; });
                }

                var data = [{
                    type: 'choropleth',
                    locationmode: 'USA-states',
                    locations: unpack(rows, 'Postal'),
                    z: unpack(rows, 'Population'),
                    text: unpack(rows, 'State'),
                    colorscale: [
                        [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                        [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                        [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
                    ],
                    colorbar: {
                        title: 'Positive Tests',
                        thickness: 5,
                    },
                }];

                var layout = {
                    geo:{
                        scope: 'usa',
                        // countrycolor: 'rgb(0, 0, 255)',
                        // showland: true,
                        // landcolor: 'rgb(217, 217, 217)',
                        // showlakes: true,
                        // lakecolor: 'rgb(255, 255, 255)',
                        // subunitcolor: 'rgb(255, 255, 255)',
                        // lonaxis: {},
                        // lataxis: {}
                    }
                };
                
                Plotly.purge(targetEl);

                Plotly.newPlot(targetEl, data, layout, {showLink: false});
        }); 
    }
}

export default mapFunctions;