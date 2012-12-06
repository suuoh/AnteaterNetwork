<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <title>Anteater Network</title>
        <link rel="stylesheet" href="main.css">
        <script src="js/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjfKwuT7W5o7YSTt6wHmeDaEhgIxuOUoI&sensor=true"></script>
        <script src="js/main.js"></script>
        <script src="js/jqueryPullTab.js"></script>
        <script src="js/markerclusterer.js"></script>        
        <script>
            $(function(){
                $('.slide-out-div').tabSlideOut({
                    tabHandle: '.handle',                              //class of the element that will be your tab
                    pathToTabImage: 'images/tab_show.png',          //path to the image for the tab (optionaly can be set using css)
                    imageHeight: '70px',  							//height of tab image
                    imageWidth: '30px',                               //width of tab image
                    tabLocation: 'left',                               //side of screen where tab lives, top, right, bottom, or left
                    speed: 300,                                        //speed of animation
                    action: 'click',                                   //options: 'click' or 'hover', action to trigger animation
                    topPos: '160px',                                   //position from the top
                    fixedPosition: false                               //options: true makes it stick(fixed position) on scroll
                });
            });

        </script>
    </head>
    <body onload="getMenu('city'); loadMap('map_canvas'); populate('', '')">
        <div class="banner">
            <a href="http://www.alumni.uci.edu"><img alt="Anteater Network"  src="images/an_logo.png" height="60"/></a><div id="infobox"></div>
            <div id="logos">
                <a href="http://www.alumni.uci.edu" target="_blank"><img src="images/facebook_logo.png" width="40px"/></a>
                <a href="https://twitter.com/UCIAA" target="_blank"><img src="images/twitter_logo.png" width="40px"/></a>
                <a href="https://plus.google.com/117331387039000132685/about" target="_blank"><img src="images/google_plus_logo.png" width="40px"/></a>
                <a href="http://www.linkedin.com/pub/uci-alumni-association/15/81/7b" target="_blank"><img src="images/linkedin_logo.png" width="40px"/></a>
            </div>
        </div>
        <div id="wrapper">
            <div id="cssmenu">
                <ul class="main">
                    <li><a href="#">Businesses</a>
                        <ul class="submenu">
                            <li><a href="#">Car Wash</a></li>
                            <li><a href="#">Dentistry</a></li>
                            <li><a href="#">Store</a></li>
                            <li><a href="#">Restaurant</a><span class="rightarrow"></span>

                                <ul class="submenutwo">
                                    <li><a href="#">Chinese</a></li>
                                    <li><a href="#">Japanese</a></li>
                                    <li><a href="#">Italian</a></li>
                                    <li><a href="#">Mexican</a></li>
                                </ul>

                            </li>
                            <li><a href="#">Something</a></li>
                        </ul>

                    </li>
                    <li><a href="#">Profession</a>
                        <ul class="submenu">
                            <li><a href='#'><span>Lawyer</span></a></li>
                            <li><a href='#'><span>Consultant</span></a></li>
                        </ul>
                    </li>
                    <li><a onclick="populate('city', '')">City</a>
                        <ul id="submenu_city" class="submenu"></ul>
                    </li>
                    <li><a>Toggle Clusters</a>
                        <ul class="submenu">
                            <li><a onclick="clusterMarkers()">Clusters On</a></li>
                            <li><a onclick="clearClusters()">Clusters Off</a></li>
                        </ul>
                    </li>   

                    <li class="fr"><a href="http://www.alumni.uci.edu/connect/update-info.php" target="_blank">Update Info</a>
                        <ul class="submenu_right"></ul>
                    </li>


                    <li class="fr"><a href="#" onclick="resetFilters(); populate('', '')">Clear Filters</a></li>
                    <li class="fr"><a href="#">Search</a>
                        <ul class="submenu_right">
                            <li class="form">
                                <form onsubmit="return false;">
                                    <input class="search" type="text" name="search" placeholder="Search..."/>
                                    <button class="searchbtn" type="submit" name="search">Submit</button>
                                </form>
                            </li>
                        </ul>
                    </li>

                    <li class="fr"><a>Search By Zipcode</a>
                        <ul class="submenu_right">
                            <li class="form">
                                <form method="GET" action="" onsubmit="return false;">
                                    <input class="search" type="text" id="zipcode" placeholder="Enter zipcode" onKeyPress="if(enter_pressed(event)){ populate('zipcode', this.value) }">
                                    <button class="searchbtn" type="submit" form="zipcode" onclick="populate('zipcode', document.getElementById('zipcode').value)">Submit</button>
                                </form>
                            </li>
                        </ul>
                    </li>

                    <li class="fr"><a>Search By Business Name</a>
                        <ul class="submenu_right">
                            <li class="form">
                                <form method="GET" action="" onsubmit="return false;">
                                    <input type="text" placeholder="Enter business name" onkeyup="populate('name', this.value)"
                                           onKeyPress="if(enter_pressed(event)){ populate('zipcode', this.value) }">
                                </form>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>

        <div class="slide-out-div"><a class="handle">Pull</a><ul id="sidenav"></ul></div>

        <div id="map_canvas">
            <noscript><b>JavaScript must be enabled in order for you to use Google Maps.</b>
            However, it seems JavaScript is either disabled or not supported by your browser.
            To view Google Maps, enable JavaScript by changing your browser options, and then
            try again.
            </noscript>
        </div>

        <div class="footer">
            <h6>&copy 2012 Team JMMP in association with UCI Alumni Association, University of California, Irvine. </h6>
        </div>
    </body>
</html>