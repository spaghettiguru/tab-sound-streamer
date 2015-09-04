// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var CONNECTION_PAGE_URL = "http://ec2-52-28-103-239.eu-central-1.compute.amazonaws.com";

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById("captureToggle");
  toggle.addEventListener("click", function(event) {
      chrome.runtime.sendMessage(null, "togglecapture");
      // generate qrcode
      new QRCode(document.getElementById("qrcode"), CONNECTION_PAGE_URL);
  });

  chrome.runtime.onMessage.addListener(function(message) {
      renderStatus(message);
    });
});
