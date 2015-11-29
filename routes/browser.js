var express = require('express');
var router = express.Router({
    mergeParams: true
});

var googleapis = require('googleapis'),
    JWT = googleapis.auth.JWT,
    analytics = googleapis.analytics('v3');

var SERVICE_ACCOUNT_EMAIL = 'account-1@mmt-digital.iam.gserviceaccount.com';
var SERVICE_ACCOUNT_KEY_FILE = __dirname + '/../cert.nocrypt.pem';


var authClient = new JWT(
    SERVICE_ACCOUNT_EMAIL,
    SERVICE_ACCOUNT_KEY_FILE,
    null,
    ['https://www.googleapis.com/auth/analytics.readonly']
);

router.get('/', function(req, res, next) {
    res.render('browser', {
        title: 'Browser Stats'
    });
});

router.get('/api/browsers/:start/:end', function(req, res, next) {
    authClient.authorize(function(err, tokens) {
        if(err) {
            console.log(err);
            res.send(err);
            return;
        }
        analytics.data.ga.get({
            auth: authClient,
            'ids': 'ga:4109305',
            'start-date': req.params.start,
            'end-date': req.params.end,
            'metrics': ['ga:sessions'],
            'dimensions': 'ga:browser'
        }, function(err, result) {
            //console.log(err, result);
            res.send(result);
        });
    });
});

router.get('/api/devices/:start/:end', function(req, res, next) {
    authClient.authorize(function(err, tokens) {
        if(err) {
            console.log(err);
            res.send(err);
            return;
        }
        analytics.data.ga.get({
            auth: authClient,
            'ids': 'ga:4109305',
            'start-date': req.params.start,
            'end-date': req.params.end,
            'metrics': ['ga:sessions'],
            'dimensions': 'ga:deviceCategory'
        }, function(err, result) {
            //console.log(err, result);
            res.send(result);
        });
    });
});

router.get('/api/browser-devices/:start/:end', function(req, res, next) {
    authClient.authorize(function(err, tokens) {
        if(err) {
            console.log(err);
            res.send(err);
            return;
        }
        analytics.data.ga.get({
            auth: authClient,
            'ids': 'ga:4109305',
            'start-date': req.params.start,
            'end-date': req.params.end,
            'metrics': ['ga:sessions'],
            'dimensions': 'ga:browser,ga:deviceCategory'
        }, function(err, result) {
            //console.log(err, result);
            res.send(result);
        });
    });
});

router.get('/api/os-details/:start/:end', function(req, res, next) {
    authClient.authorize(function(err, tokens) {
        if(err) {
            console.log(err);
            res.send(err);
            return;
        }
        analytics.data.ga.get({
            auth: authClient,
            'ids': 'ga:4109305',
            'start-date': req.params.start,
            'end-date': req.params.end,
            'metrics': ['ga:sessions'],
            'dimensions': 'ga:operatingSystem,ga:operatingSystemVersion'
        }, function(err, result) {
            //console.log(err, result);
            res.send(result);
        });
    });
});

module.exports = router;
