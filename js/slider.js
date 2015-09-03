/*jshint browser: true, jquery: true, -W083*/
/*global Reveal, numeral, google */

(function Slider($) {
    "use strict";

    var actions = {
        calculateMovieRating: function (targetNode) {
            var id = setInterval(function () {
                if (actions.adjustRatingValues(targetNode)) {
                    clearInterval(id);
                }
            }, 1000);
        },

        resetMovieRating: function (targetNode) {
            actions.adjustRatingValues(targetNode, null, 0);
        },

        adjustRatingValues: function (targetNode, event, targetValue) {
            var sectionNode = targetNode.closest("section");
            var nodes = $(".circle", sectionNode);
            var values = {};
            var rating = 0;
            var counter = 500;

            if (targetValue === undefined) {

                while (counter-- > 0 && (this.prevAbsValue === undefined || rating === 0 ||
                        Math.abs(4.3 - rating) >= this.prevAbsValue)) {
                    if (this.prevAbsValue === undefined) {
                        this.prevAbsValue = 10000;
                    }
                    rating = 0;
                    nodes.each(function (index) {
                        var value = targetValue !== undefined ? targetValue : Math.random(1);
                        values[index] = value;
                        rating += value;
                    });
                }

                this.prevAbsValue = Math.abs(4.3 - rating);
            }

            $.each(nodes, function (index, element) {
                var value = (targetValue === undefined) ? values[index] : targetValue;
                $(element).css({
                    padding: value * 20
                }).attr("data-value", numeral(value).format("0.00"));
            });

            $("#calculatedRating", sectionNode).html(numeral(rating).format("0.00"));
            if (rating >= 4.3 && rating < 4.33) {
                this.prevAbsValue = undefined;
                return true;
            }
        },

        createChart1: function (targetNode, event, dataArray) {
            var sectionNode = targetNode.closest("section");

            var data = google.visualization.arrayToDataTable(dataArray || [['Size', 'Weight', "X", "Y"],
                                                                           [0, 0, 0, 0]]);
            actions.chart1 = {};
            actions.chart1.options = {
                title: 'Size vs. Weight comparison',
                hAxis: {
                    title: 'Size',
                    minValue: 0,
                    maxValue: 15
                },
                vAxis: {
                    title: 'Weight',
                    minValue: 0,
                    maxValue: 15
                },
                backgroundColor: 'transparent',
                width: 900,
                height: 350,
                legend: 'none',
                animation: {
                    duration: 200,
                    easing: 'inAndOut',
                }
            };

            actions.chart1.chart = new google.visualization.ScatterChart($("#chart1", sectionNode)[0]);
            actions.chart1.chart.draw(data, actions.chart1.options);
        },

        clearChart1Data: function () {
            var data = google.visualization.arrayToDataTable([['Size', 'Weight'],
                                                                           [0, 0]]);
            actions.chart1.chart.draw(data, actions.chart1.options);
        },

        updateChart1WithRandomData: function () {
            var dataArray = [['Size', 'Weight', 'X', 'Y']];
            for (var i = 0; i < 100; i++) {
                dataArray.push([getRandomArbitrary(1, 20), getRandomArbitrary(1, 20), getRandomArbitrary(1, 20), getRandomArbitrary(1, 20)]);
            }

            var data = google.visualization.arrayToDataTable(dataArray);
            actions.chart1.chart.draw(data, actions.chart1.options);
        },

        updateChart1WithOrganizedData1: function () {
            var dataArray = [['Size', 'Weight', 'X', 'Y']];
            var xAxisData = [4, 5, 6, 10, 11, 12, 16, 17, 18, 20];
            for (var i = 0; i < 300; i++) {
                var index = getRandomArbitraryInt(0, 9);
                var x = xAxisData[index] + (getRandomArbitraryInt(0, 1) === 1 ? 1 : -1 * getRandomArbitrary(0, 2));
                if (index < 3) {
                    dataArray.push([x, getRandomArbitrary(1, 20), null, null]);
                } else if (index < 6) {
                    dataArray.push([x, null, getRandomArbitrary(1, 20), null]);
                } else {
                    dataArray.push([x, null, null, getRandomArbitrary(1, 20)]);
                }
            }
            var data = google.visualization.arrayToDataTable(dataArray);
            actions.chart1.chart.draw(data, actions.chart1.options);
        },

        updateChart1WithOrganizedData2: function () {
            var dataArray = [['Size', 'Weight']];
            var xAxisData = [4, 5, 6, 8, 9, 10, 13, 14, 15, 18, 19, 20];
            for (var i = 0; i < 300; i++) {
                var index = getRandomArbitraryInt(0, 11);
                var x = xAxisData[index] + (getRandomArbitraryInt(0, 1) === 1 ? 1 : -1 * getRandomArbitrary(0, 2.5));
                dataArray.push([x, getRandomArbitrary(1, 20)]);
            }
            var data = google.visualization.arrayToDataTable(dataArray);
            actions.chart1.chart.draw(data, actions.chart1.options);
        },

        updateChart1WithOrganizedDataColored2: function () {
            var dataArray = [['Size', 'Weight', 'X', 'Y', 'Z']];
            var xAxisData = [4, 5, 6, 8, 9, 10, 13, 14, 15, 18, 19, 20];
            for (var i = 0; i < 300; i++) {
                var index = getRandomArbitraryInt(0, 11);
                var x = xAxisData[index] + (getRandomArbitraryInt(0, 1) === 1 ? 1 : -1 * getRandomArbitrary(0, 2.5));
                if (index < 3) {
                    dataArray.push([x, getRandomArbitrary(1, 20), null, null, null]);
                } else if (index < 6) {
                    dataArray.push([x, null, getRandomArbitrary(1, 20), null, null]);
                } else if (index < 9) {
                    dataArray.push([x, null, null, getRandomArbitrary(1, 20), null]);
                } else {
                    dataArray.push([x, null, null, null, getRandomArbitrary(1, 20)]);
                }
            }
            var data = google.visualization.arrayToDataTable(dataArray);
            actions.chart1.chart.draw(data, actions.chart1.options);
        },

        updateChart1WithOrganizedDataColored3: function () {
            var dataArray1 = [['Size', 'Weight']];
            var dataArray2 = [['Size', 'Weight', 'X']];
            var xAxisData = [4, 5, 6, 8, 9, 10, 13, 14, 15, 18, 19, 20];
            for (var i = 0; i < 300; i++) {
                var index = getRandomArbitraryInt(0, 11);
                var x = xAxisData[index] + (getRandomArbitraryInt(0, 1) === 1 ? 1 : -1 * getRandomArbitrary(0, 2.5));
                var y = getRandomArbitrary(1, 20);
                dataArray1.push([x, y]);
                if (index < 3) {
                    dataArray2.push([x, y, null]);
                } else if (index < 6) {
                    dataArray2.push([x, null, y]);
                } else if (index < 9) {
                    dataArray2.push([x, y, null]);
                } else {
                    dataArray2.push([x, y, null]);
                }
            }
            var data = google.visualization.arrayToDataTable(dataArray1);
            actions.chart1.chart.draw(data, actions.chart1.options);
            actions.chart1.dataArray2 = dataArray2;
        },

        updateChart1WithOrganizedDataColored4: function () {
            if(!actions.chart1.dataArray2) {
                actions.updateChart1WithOrganizedDataColored4();
            }
            var data = google.visualization.arrayToDataTable(actions.chart1.dataArray2);
            actions.chart1.chart.draw(data, actions.chart1.options);
        }
    };

    // Returns a random number between min (inclusive) and max (exclusive)
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Returns a random number between min (inclusive) and max (exclusive)
    function getRandomArbitraryInt(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    function processFragmentInEvent(event) {
        var data = $(event.fragment).data();
        if (actions[data.fragmentActionIn]) {
            actions[data.fragmentActionIn]($(event.fragment), event);
        }
    }

    function processFragmentOutEvent(event) {
        var data = $(event.fragment).data();
        if (actions[data.fragmentActionOut]) {
            actions[data.fragmentActionOut]($(event.fragment), event);
        }
    }

    Reveal.addEventListener('fragmentshown', processFragmentInEvent);
    Reveal.addEventListener('fragmenthidden', processFragmentOutEvent);

    (function configureReveal() {
        // Full list of configuration options available at:
        // https://github.com/hakimel/reveal.js#configuration
        Reveal.initialize({
            controls: false,
            progress: true,
            history: true,
            center: true,

            slideNumber: 'c / t',
            transition: 'slide', // none/fade/slide/convex/concave/zoom

            // Parallax background image
            // parallaxBackgroundImage: 'css/images/background-2.jpg',

            // Parallax background size
            //parallaxBackgroundSize: '2444px 1636px', // CSS syntax, e.g. "2100px 900px" - currently only pixels are supported (don't use % or auto)
            parallaxBackgroundSize: '2560px 1600px',

            // Amount of pixels to move the parallax background per slide step,
            // a value of 0 disables movement along the given axis
            // These are optional, if they aren't specified they'll be calculated automatically
            parallaxBackgroundHorizontal: 300,
            parallaxBackgroundVertical: 0,

            // Optional reveal.js plugins
            dependencies: [
                {
                    src: 'lib/js/classList.js',
                    condition: function () {
                        return !document.body.classList;
                    }
                },
                {
                    src: 'plugin/markdown/marked.js',
                    condition: function () {
                        return !!document.querySelector('[data-markdown]');
                    }
                },
                {
                    src: 'plugin/markdown/markdown.js',
                    condition: function () {
                        return !!document.querySelector('[data-markdown]');
                    }
                },
                {
                    src: 'plugin/highlight/highlight.js',
                    async: true,
                    condition: function () {
                        return !!document.querySelector('pre code');
                    },
                    callback: function () {
                        hljs.initHighlightingOnLoad();
                    }
                },
                {
                    src: 'plugin/zoom-js/zoom.js',
                    async: true
                },
                {
                    src: 'plugin/notes/notes.js',
                    async: true
                }
            ]
        });
    })();
})(jQuery);
