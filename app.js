// main document ready function to check if dom is loaded fully or not
$(document).ready(function () {

  var myToken = 'EAAGL4nl44NEBAN6WuyOHXro1m4c4ixnk2NZBODy391zZAeqZAzpuKxwDZCzHiCZCrk6QBRMZA4ZCEyZBjT1iR4KSiDhLMYVDAbAb5RrZCYQk4iPpwh4gTGS8dfeFByjU3Sqn9HCZAnj0JTlZCmSWtMhfOol9y8IRN4CuUmqQc71tbYUpLh3Ccf8dDDp6ZAI8Myl982ao7uEVjoHopAZDZD';
  var url = 'https://graph.facebook.com/v3.1/me?access_token=';
  var basicInfo, newsFeed;

  //function to get basic info or directly render content if present
  function getBasicInfo() {
    $("#datacard").hide();
    $("#landing-div").hide();
    if (basicInfo) {
      renderBasicInfo(basicInfo);
    }
    else {
      var fields = '&fields=id%2Cname%2Cemail%2Cbirthday%2Cage_range%2Chometown%2Cpicture';
      $.ajax(url + myToken + fields, {
        success: function (response) {
          basicInfo = response;
          renderBasicInfo(response);
        }
      });
    }
  }

  //function to render basic information
  function renderBasicInfo(data) {
    $("#datacard").show("200");
    toggleClasses('basic');
    $("#datacard .card-title").html(
      '<h4> Basic Info </h4>'
    )
    $("#datacard .prof-img").removeClass('hidden');
    $("#datacard .prof-img").html(
      '<img src=' + data.picture.data.url + '>'
    )
    $("#datacard .card-content").html(
      `
        <ul class="list-group">
          <li class="list-group-item">Name: ` + data.name + `</li>
          <li class="list-group-item">Email: ` + data.email + `</li>
          <li class="list-group-item">Birhday: ` + data.birthday + `</li>
          <li class="list-group-item">Age: ` + data.age_range.min + `</li>
          <li class="list-group-item">Hometown: `+ data.hometown.name + `</li>
        </ul>
      `
    )
  }

  // function to get news feed
  function getNewsFeed() {
    $("#datacard").hide();
    $("#landing-div").hide();
    if (newsFeed) {
      renderNewsFeed(newsFeed);
    }
    else {
      var fields = '&fields=feed';
      $.ajax(url + myToken + fields, {
        success: function (response) {
          newsFeed = response;
          renderNewsFeed(response);
        }
      })
    }
  }

  function renderNewsFeed(data) {
    $("#datacard").show("200");
    toggleClasses('feed');
    $("#datacard .card-title").html(
      '<h4> News Feed </h4>'
    )
    $("#datacard .prof-img").addClass('hidden');
    $("#datacard .card-content").html(
      `
        <ul class="list-group" id="feed-list">
        </ul>
      `
    );
    $.each(data.feed.data, function (index, val) {
      val.message = val.message ? val.message : 'Not Found'
      $('#feed-list').append(
        `<li class="list-group-item">
          <span class="feed-content"><h5>Message:</h5> ` + val.message + `</span>
          <span class="feed-content"><h5>Created Time:</h5> ` + new Date(val.created_time.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) + `</span>
        </li>`);
    });
  }

  // function to add or remove classes
  function toggleClasses(state) {
    $("#leftspace").toggleClass("col-sm-2 col-md-4 col-lg-4 col-xl-4", state === 'basic');
    $("#leftspace").toggleClass("col-sm-1 col-md-3 col-lg-3 col-xl-3", state === 'feed');
    $("#datacard").toggleClass("col-sm-8 col-md-4 col-lg-4 col-xl-4", state === 'basic');
    $("#datacard").toggleClass("col-sm-10 col-md-6 col-lg-6 col-xl-6", state === 'feed');
  }

  function showLandingContent() {
    $("#landing-div").show();
    $("#datacard").hide();
  }

  $("#datacard").hide();
  $("#profile-info").on('click', getBasicInfo);
  $("#news-feed").on('click', getNewsFeed);
  $("#landing").on('click', showLandingContent);
});