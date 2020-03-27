const http = require("http");
const url = require("url");

const hostname = '127.0.0.1';
const port = 8888;

http.createServer( (req, res) => {
    
    const reqUrl = url.parse(req.url, true);
    console.log(`${req.method}> ${reqUrl.pathname}`);
    if(reqUrl.pathname == '/post/' || reqUrl.pathname == '/put/' || reqUrl.pathname == '/delete/' || reqUrl.pathname == '/get/') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, PUT');
      res.setHeader('Access-Control-Allow-Headers', '*');
    }

    if(reqUrl.pathname == '/get/') {
        var myObj = [
            {
              "index": 0,
              "guid": "8d72a5bb-17b4-448e-aeff-dd60ddb9fb58",
              "isActive": true,
              "balance": "$1,996.73",
              "picture": "http://placehold.it/32x32",
              "age": 24,
              "eyeColor": "brown",
              "name": "Katina Jackson",
              "gender": "female",
              "company": "ZOMBOID",
              "email": "katinajackson@zomboid.com",
              "phone": "+1 (887) 446-2574",
              "address": "707 Lott Avenue, Riceville, California, 4020",
              "about": "Occaecat Lorem occaecat sunt veniam sit cillum dolore sunt do reprehenderit excepteur adipisicing. Eiusmod reprehenderit id ipsum aute mollit magna laborum ut laboris laboris nostrud. Nulla consectetur culpa occaecat anim aliquip non commodo non commodo mollit consequat cillum ullamco. Aliquip veniam dolore in id ullamco exercitation quis Lorem irure officia reprehenderit proident nulla occaecat.\r\n",
              "registered": "2019-09-03T09:08:17 -02:00"
            },
            {
              "index": 1,
              "guid": "a372a62e-1076-475d-a500-465f4a5c68e2",
              "isActive": true,
              "balance": "$3,965.65",
              "picture": "http://placehold.it/32x32",
              "age": 23,
              "eyeColor": "blue",
              "name": "Lucy Macias",
              "gender": "female",
              "company": "PODUNK",
              "email": "lucymacias@podunk.com",
              "phone": "+1 (983) 531-3063",
              "address": "441 Rost Place, Reno, Illinois, 1461",
              "about": "Nisi reprehenderit est irure aute aute incididunt amet pariatur esse et do anim. In esse cillum eiusmod do commodo ex id nostrud occaecat do adipisicing sint. Voluptate sint mollit veniam proident cupidatat est magna irure voluptate ad nisi. Ipsum culpa enim excepteur id aliquip irure laborum.\r\n",
              "registered": "2017-10-11T02:38:50 -02:00"
            },
            {
              "index": 2,
              "guid": "c0ffd2e1-aedf-4cde-95e1-e8dfb47ac062",
              "isActive": false,
              "balance": "$2,846.77",
              "picture": "http://placehold.it/32x32",
              "age": 30,
              "eyeColor": "brown",
              "name": "Rachelle Barrett",
              "gender": "female",
              "company": "EXOBLUE",
              "email": "rachellebarrett@exoblue.com",
              "phone": "+1 (893) 540-2326",
              "address": "856 Autumn Avenue, Lloyd, Oklahoma, 5617",
              "about": "Est incididunt cillum deserunt sit excepteur aute tempor ipsum amet eu. Incididunt cillum Lorem excepteur laboris. In sit do quis ea ipsum adipisicing quis dolore. Ea esse officia cillum culpa anim id eu amet proident qui ullamco voluptate. Ullamco quis nulla deserunt non. Consectetur ullamco proident qui sint amet do dolor laborum cupidatat culpa cupidatat nulla voluptate enim.\r\n",
              "registered": "2015-11-27T07:55:12 -01:00"
            },
            {
              "index": 3,
              "guid": "0e52befa-fb3e-458c-a003-8fd02593b5da",
              "isActive": true,
              "balance": "$3,423.57",
              "picture": "http://placehold.it/32x32",
              "age": 21,
              "eyeColor": "blue",
              "name": "Barton Holder",
              "gender": "male",
              "company": "APEXTRI",
              "email": "bartonholder@apextri.com",
              "phone": "+1 (936) 414-3133",
              "address": "184 Jefferson Street, Marshall, Nevada, 7153",
              "about": "Ex officia est ad velit amet sint in. Sint aliqua aliquip anim non eu ex tempor enim qui duis. Excepteur officia quis ut proident amet. Sint consectetur et velit sint fugiat incididunt esse sit veniam laborum pariatur. Cillum reprehenderit cupidatat culpa ullamco laboris sunt irure. Excepteur incididunt cillum nulla in nulla culpa Lorem ea dolore. Ex labore adipisicing aliqua sunt.\r\n",
              "registered": "2014-03-28T06:05:15 -01:00"
            },
            {
              "index": 4,
              "guid": "0a5c497c-83f3-4629-940d-3cdede8d2d4c",
              "isActive": true,
              "balance": "$1,652.32",
              "picture": "http://placehold.it/32x32",
              "age": 38,
              "eyeColor": "blue",
              "name": "Beulah Snyder",
              "gender": "female",
              "company": "EARTHPLEX",
              "email": "beulahsnyder@earthplex.com",
              "phone": "+1 (946) 523-2678",
              "address": "478 Rock Street, Bayview, Oregon, 3583",
              "about": "Irure fugiat veniam minim consequat consequat eiusmod consequat voluptate cillum laborum proident. Officia mollit nisi duis veniam nisi fugiat. Nisi aliquip nulla sint nisi magna culpa aliquip ad occaecat mollit commodo ad Lorem. Lorem esse deserunt mollit cupidatat est est deserunt deserunt eiusmod sint tempor occaecat. Nostrud do sint non ea incididunt ad ad. Aute velit velit nisi minim sunt labore fugiat non quis proident laboris. Adipisicing laborum dolor tempor aliquip culpa amet esse consequat in irure.\r\n",
              "registered": "2014-12-21T03:31:45 -01:00"
            },
            {
              "index": 5,
              "guid": "e504fa62-5c54-4e55-b2fa-49d31771f021",
              "isActive": false,
              "balance": "$1,663.61",
              "picture": "http://placehold.it/32x32",
              "age": 38,
              "eyeColor": "blue",
              "name": "Gilmore Middleton",
              "gender": "male",
              "company": "QUOTEZART",
              "email": "gilmoremiddleton@quotezart.com",
              "phone": "+1 (881) 546-2890",
              "address": "285 Highland Boulevard, Marion, New Mexico, 8390",
              "about": "Reprehenderit aliqua reprehenderit eu exercitation incididunt dolore eiusmod laboris cupidatat incididunt qui nisi irure proident. Esse et et elit Lorem eiusmod tempor in pariatur exercitation minim. Nulla duis ipsum dolor voluptate et eu sint qui ad esse. Ipsum quis incididunt eu exercitation. Ea mollit qui eiusmod laboris pariatur incididunt magna nostrud qui et ad enim quis qui.\r\n",
              "registered": "2019-07-20T04:21:08 -02:00"
            }
          ];
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end("_callback(" + JSON.stringify(myObj) + ");");
    } else if(reqUrl.pathname == '/post/' || reqUrl.pathname == '/put/' || reqUrl.pathname == '/delete/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            message: "Povedlo se!"
        }))
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: "Nastala chyba"
        }))
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});