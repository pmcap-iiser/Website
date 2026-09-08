/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

// Expandable box logic
$(function() {
	$('.expandable-header').on('click', function(e) {
		var $box = $(this).closest('.expandable-box');
		// If already expanded, collapse it
		if ($box.hasClass('expanded')) {
			$box.removeClass('expanded');
		} else {
			// Collapse others (accordion style)
			$('.expandable-box.expanded').removeClass('expanded');
			$box.addClass('expanded');
		}
	});
});

})(jQuery);
/* === Participants CSV + Expander (no modal) === */
$(function () {
  // 1) CSV data (Name,Affiliation)
  const csvData = `
Aman Awasthi,	IIT Bombay
Anargha Mondal,	IISER Pune
Animesh Maji,	IISER Pune
Animesh Sah,	TIFR Mumbai
Aniruddha Chakraborty,	TIFR Mumbai
Ankita Sarkar,	St. Xavier's College&#44; Mumbai
Arka Banerjee,	IISER Pune
Ashutosh Joshi,	TIFR Mumbai
Debaditya Chakrabarti,	IISER Pune
Diptimoy Ghosh,	IISER Pune
Eishica Chand,	IISER Pune
Gagan Arora,	TIFR Mumbai
Gouri Vandana A S,	IISER Pune
Gowri S Nair,	TIFR Mumbai
Harsh Mehta,	TIFR Mumbai
Hridya R,	TIFR Mumbai
Jahaan Thakkar,	TIFR Mumbai
Jatin kumar,	NCRA
Jui Mahajan,	Fergusson College
Khushi Lalit,	IUCAA
Manibrata Sen,	IIT Bombay
Mohd Asim Ansari,	IUCAA
Nitish Kumar Meher,	IUCAA
Om Kishor Hebbar,	IISER Pune
Pooja Rani,	TIFR Mumbai
Pralay Biswas,	NCRA
Purushottam Sahu,	IIT Bombay
Rahul S Hejjaji,	IISER Pune
Rishi Khatri,	TIFR Mumbai
Rohan Chakraborty,	TIFR Mumbai
Sadashiv Sahoo,	IIT Bombay
Saptarshi Sarkar,	NCRA
Sayan Maity,	IIT Bombay
Shadab Alam,	TIFR Mumbai
Shamik Niyogi,	IIT Bombay
Shivam Gola,	IIT Bombay
Shivesh Tuli,	IISER Pune
Shreya Mukherjee,	IUCAA
Shubham Sati,	IUCAA
Siddhant Sen,	IISER Pune
Soham Sahasrabuddhe,	IIT Bombay
Soumak Maitra,	TIFR Mumbai
Soumen Kumar Manna,	IIT Bombay
Soumil Sahu,	IUCAA
Sourav Chatterjee,	TIFR Mumbai
Sourav Das,	IUCAA
Suchira Sarkar,	TIFR Mumbai
Sukhdeep Singh Gill,	TIFR Mumbai
Sumit Kumar Adhya,	IIT Bombay
Supriyo Saha,	TIFR Mumbai
Susmita Adhikari,	IISER Pune
Suvodip Mukherjee,	TIFR Mumbai
Swanith Upadhye,	TIFR Mumbai
Swarajit Dhar,	TIFR Mumbai
Varun Bhat,	NCRA
Vikhyat Sharma,	IISER Pune
Yash Koushal,	IISER Pune
Yogesh Wadadekar,	NCRA
Yogita Kumari,	IUCAA
`.trim();

  // 2) Elements
  const expander = document.getElementById('participantsExpander'); // <details id="participantsExpander">
  const tbody = document.querySelector('#participants tbody');
  let populated = false;

  // 3) Populate once
  function populateParticipants() {
    if (populated || !tbody) return;
    const lines = csvData.split(/\r?\n/).filter(Boolean);

    lines.forEach((line, i) => {
      const [name = '', affiliation = ''] = line.split(/\s*,\s*/);
      const tr = document.createElement('tr');
      tr.innerHTML =
        `<td>${i + 1}</td><td>${name}</td><td>${affiliation}</td>`;
      tbody.appendChild(tr);
    });

    populated = true;
  }

  // 4) Hook into the details expander
  if (expander) {
    expander.addEventListener('toggle', () => {
      if (expander.open) populateParticipants();
    });
    // If already open on load:
    if (expander.open) populateParticipants();
  }
});
