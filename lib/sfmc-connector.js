var sfmcAPI = {
    addRow: (obj) =>{
        return 'sfmcAPI, addRow successfully';
    }
}

function connect(config, operation){
    return function (obj){
        console.log(`sfmcAPI connect, config: ${JSON.stringify(config)}`)
        return operation(config, obj);
    }
}

function addRow(config, obj){
    return sfmcAPI.addRow(obj);
}

module.exports = {
    connect,
    addRow
};