const endpoints = require('./endpoints');
const https = require('https');

const apiHost = "api.eatstreet.com";
const apiVersion = "/publicapi/v1/";

var EatStreet = function(apiKey){

    if(!(this instanceof EatStreet)){
        return new EatStreet(apiKey);
    }

    this.apiKey = apiKey;
    this.endpoints = endpoints;
    this.apiHost = apiHost;
    this.apiVersion = apiVersion;
}


/**
 * Searches EatStreet for restaurants.
 *
 *
 * `params` is an Object in the form:
 * {
 *   address: String // Street Address to Search.
 *   lat: Number     // Lattitude to Search.
 *   long: Number    // Longitude to Search.
 *   method: String  // Delivery, Pickup, Both
 *   radius: Number  // Radius to Search.
 *   search: String  // Query to find keywords.
 * }
 *
 * @param  {Object}  params         options object (described above).
 * @param  {cb}      callback       callback in the form: function (err, response)
 */
EatStreet.prototype.SearchRestaurants = function(params, callback){
    
    var query = this.buildRequestQuery(params);
    
    return this.get(endpoints.restaurant_search, null, query, callback);
}

/**
 * Gets full details for a specific restaurant.
 *
 *
 * `params` is an Object in the form:
 * {
 *   apiKey: String  // apiKey gained from SearchRestaurants
 *   address: String // Street address to determine delivery information.
 *   lat: Number     // Lattitude to determine delivery information.
 *   long: Number    // Longitude to determine delivery information.
 * }
 *
 * @param  {Object}  params         options object (described above).
 * @param  {cb}      callback       callback in the form: function (err, response)
 */
EatStreet.prototype.RestaurantDetails = function(params, callback){

    if(params.apiKey == null){
        callback("ERROR: Restaurant apiKey required.", null, null);
    }
    var query = this.buildRequestQuery(params);

    return this.get(endpoints.restaurant_details, params.apiKey, query, callback);
}

/**
 * Gets full menu for a specific restaurant.
 *
 *
 * `params` is an Object in the form:
 * {
 *   apiKey:         String  // apiKey gained from SearchRestaurants
 *   customizations: Boolean // Street address to determine delivery information.
 * }
 *
 * @param  {Object}  params         options object (described above).
 * @param  {cb}      callback       callback in the form: function (err, response)
 */
EatStreet.prototype.RestaurantMenu = function(params, callback){
    
    if(params.apiKey == null){
        callback("ERROR: Restaurant apiKey Required", null, null);
    }
    
    var query = this.buildRequestQuery(params);

    return this.get(endpoints.restaurant_menu, params.apiKey, query, callback);
}

/**
 * Gets item customizations for a specific menu item.
 *
 *
 * `params` is an Object in the form:
 * {
 *   apiKey: String  // apiKey gained from SearchRestaurants
 * }
 *
 * @param  {Object}  params         options object (described above).
 * @param  {cb}      callback       callback in the form: function (err, response)
 */
EatStreet.prototype.ItemCustomizations = function(params, callback){
    if(params.apiKey == null){
        callback("ERROR: Item apiKey Required", null);
    }

    return this.get(endpoints.customizations, params.apiKey, callback);
}


EatStreet.prototype.get = function(path, key = null, query, callback){

    if(typeof key === 'function'){
        callback = key;
        key = "";
    }
    if(typeof query === 'function'){
        callback = query;
        query = "";
    }
    
    var endpoint = (key == null || typeof key === 'function') ? path : path.replace("{apiKey}", key);

    var url = this.apiVersion + endpoint + query;
    var headers = { "X-Access-Token": this.apiKey };

    var options = {
        host: this.apiHost,
        port: 443,
        path: url,
        method: 'GET',
        headers: headers
    }

    return this.request(options, callback);
}

EatStreet.prototype.post = function(path, key = null, query, callback){

    if(typeof key === 'function'){
        callback = key;
    }

    var endpoint = (key == null || typeof key === 'function') ? path : path.replace("{apiKey}", key);

    var url = this.apiVersion + endpoint + query;
    var headers = { "X-Access-Token": this.apiKey };

    var options = {
        host: this.apiHost,
        port: 443,
        path: url,
        method: 'POST',
        headers: headers
    }
    
    return this.request(options, callback);
}

EatStreet.prototype.request = function(options, callback){
    
    // if no `params` is specified but a callback is, use default params
    if (typeof options === 'function') {
        callback = options
        options = {}
    }

    https.request(options, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var json = JSON.parse(body);
            callback(null, json);
        });

    }).end();
}

/*
 * Consume the request params object and make it a useful query string.
 */

EatStreet.prototype.buildRequestQuery = function(params, callback){
    var query = '?';

    if(params.method){ query += 'method=' + params.method; }

    if(params.address || (params.lat && params.long)){
        if(!(params.address == null)){
            query += '&street-address=' + encodeURIComponent(params.address);
        } else if((!(params.lat == null) && !(params.long == null))){
            query += '&lattitude=' + encodeURIComponent(params.lat) + '&longitude=' + encodeURIComponent(params.long);
        } else {
            callback("ERROR: Address or Lat/Long Required", null);
        }
    }

    if(!(params.radius == null)){
        query += '&radius=' + encodeURIComponent(params.radius);
    }
    if(!(params.search == null)){
        query += '&search=' + encodeURIComponent(params.search);
    }

    if(!(params.customizations == null)){
        query += '&customizations=' + encodeURIComponent(params.customizations);
    }

    return query;

}

module.exports = EatStreet;
