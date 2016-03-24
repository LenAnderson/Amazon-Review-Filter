// ==UserScript==
// @name         Amazon Review Filter
// @namespace    https://github.com/LenAnderson/
// @downloadURL  https://github.com/LenAnderson/Amazon-Review-Filter/raw/master/amazon_review_filter.user.js
// @version      0.1
// @author       LenAnderson
// @match        http://www.amazon.com/*
// @match        http://www.amazon.co.uk/*
// @match        http://www.amazon.de/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var reviewCountThreshold = 40;
var reviewValueThreshold = 4;

function hideBelowThreshold() {
    var results = document.querySelectorAll('.s-result-item');
    [].forEach.call(results, function(result) {
        var stars = 0;
        var count = 0;
        var starsEl = result.querySelector('.a-icon.a-icon-star > .a-icon-alt');
        if (starsEl) {
            stars = starsEl.textContent.trim().replace(/^(\d(\.\d)?) .+$/, '$1')*1;
        }
        var countEl = result.querySelector('[href*="#customerReviews"]');
        if (countEl) {
            count = countEl.textContent.trim().replace(',', '')*1;
        }

        if (stars < reviewValueThreshold || count < reviewCountThreshold) {
            //result.remove();
            result.style.opacity = '0.25';
        }
    });
}

var mo = new MutationObserver(hideBelowThreshold);
mo.observe(document.body, {childList: true, subtree: true});

hideBelowThreshold();
