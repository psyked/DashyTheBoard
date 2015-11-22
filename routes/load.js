var express = require('express');
var router = express.Router({mergeParams: true});

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
    authClient.authorize(function(err, tokens) {
        if(err) {
            console.log(err);
            return;
        }
        analytics.data.ga.get({
            auth: authClient,
            'ids': 'ga:4109305',
            'start-date': req.params.start,
            'end-date': req.params.end,
            'metrics': ['ga:pageLoadTime,ga:pageDownloadTime,ga:domContentLoadedTime'],
            'dimensions': 'ga:date'
        }, function(err, result) {
            res.send('index', result);
        });
    });
});

module.exports = router;
