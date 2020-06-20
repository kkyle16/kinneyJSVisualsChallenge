// Reads in the json file after hosting the server
d3.json("./samples.json").then((importedData) => {
    var data = importedData;
    console.log(data);

    var samples = data.samples;
    console.log(samples);

    var otu_ids = samples[0].otu_ids;
    var sample_vals = samples[0].sample_values;
    var otu_labels = samples[0].otu_labels;

    var otu_ids_t10 = otu_ids.slice(0, 10) //Grabs the top 10
        .reverse() // Reverses the array for the graph
        .map(String) // Converts each OTU to a string
        .map(id => "OTU " + id); // Adds OTU to the beginning of each number
    var sample_vals_t10 = sample_vals.slice(0, 10).reverse();
    var otu_labels_t10 = otu_labels.slice(0, 10).reverse();

    // Creates the trace and layout for the plot
    var trace1 = {
        type: "bar",
        orientation: "h",
        x: sample_vals_t10,
        y: otu_ids_t10,
        text: otu_labels_t10
    };
    var layout = {
        title: "Top 10 OTUs",
    };
    data1 = [trace1];

    Plotly.newPlot("bar", data1, layout);

    //--------------Bubble Plot-----------------
    var trace2 = {
        x: otu_ids,
        y: sample_vals,
        mode: "markers",
        marker: {
            size: sample_vals,
            color: otu_ids
        },
        text: otu_labels
    };
    var data2 = [trace2];
    var layout2 = {
        title: "Top 10 OTUs",
        height: 500,
        width: 1200
    };

    Plotly.newPlot('bubble', data2, layout2)

    //-------------Demographic Info-------------
    var demo_dict = data.metadata[0];
    console.log(Object.entries(demo_dict));

    var info = d3.select("#sample-metadata")
    Object.entries(demo_dict).forEach(i => {
        info.append("p")
            .text(`${i[0]}: ${i[1]}`);
    });

    //--------------DropDown-------------------
    const ids = data.names;
    dropdown = d3.select("#selDataset");
    ids.forEach(id => {
        dropdown.append("option")
            .text(id);
    })

    //---------------Update--------------------
    dropdown.on("change", updatePlotly);

    function updatePlotly {

    }
});