/*jshint browser: true, jquery: true, -W083*/
/*global Reveal, numeral */

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
                $(element).css({
                    padding: values[index] * 20
                }).attr("data-value", numeral(values[index]).format("0.00"));
            });

            $("#calculatedRating", sectionNode).html(numeral(rating).format("0.00"));
            if( rating >= 4.3 && rating < 4.33) {
                this.prevAbsValue = undefined;
                return true;
            }
        }
    };

    function processFragmentChangeEvent(event) {
        var data = $(event.fragment).data();
        if (actions[data.fragmentAction]) {
            actions[data.fragmentAction]($(event.fragment), event);
        }
    }

    Reveal.addEventListener('fragmentshown', processFragmentChangeEvent);
})(jQuery);