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
Abhishri Shrivastava,TIFR Mumbai
Agniva Roychowdhury,NCRA Pune
Amol Dighe,TIFR Mumbai
Anargha Mondal,IISER Pune
Animesh Maji,IISER Pune
Animesh sah,TIFR Mumbai
Anirban Chakraborty,NCRA Pune
Archana Pai,IIT Bombay
Arka Banerjee,IISER Pune
Arun Thalapillil,IISER Pune
Aseem Paranjape,IUCAA Pune
Avinash Tiwari,IUCAA Pune
Bhooshan Gadre,IUCAA Pune
Brijanshi,IISER Pune
Chandrayee Maitra,IUCAA Pune
Dhruv Satra,IISER Pune
Diptimoy Ghosh,IISER Pune
Eishica Chand,IISER Pune
Harsh Mehta,TIFR Mumbai
Harshit Raj,TIFR Mumbai
Jahaan Thakkar,TIFR Mumbai
Khushi Lalit,IUCAA Pune
Manibrata Sen,IIT Bombay
Mohamed Rameez,TIFR Mumbai
Navya Saraswat,TIFR Mumbai
Ojas Patil,IISER Pune
Om Kishor Hebbar,IISER Pune
Pooja Rani,TIFR Mumbai
Pralay Biswas,NCRA Pune
Prashant Varshney,TIFR Mumbai
Premvijay Velmani,TIFR Mumbai
Prolay Chanda,TIFR Mumbai
Pulak Mohapatra,NCRA Pune
Raghav Wani,IISER Pune
Raghunathan Srianand,IUCAA Pune
Rahul S Hejjaji,IISER Pune
Ranit Behera,IUCAA Pune
Sachin Jain,IISER Pune
Saee Dhawalikar,IUCAA Pune
Samsuzzaman Afroz,TIFR Mumbai
Sanjit Mitra,IUCAA Pune
Saptarshi Pandey,IISER Pune
Saptarshi Sarkar,NCRA Pune
Sayantan Chakraborty,IISER Pune
Shadab Alam,TIFR Mumbai
Shivam Gola,IIT Bombay
Shreya Mukherjee,IUCAA Pune
Shubham Sati,IUCAA Pune
Siddhant sen,IISER Pune
Soumak Maitra,TIFR Mumbai
Sourav Das,IUCAA Pune
Subha Majumdar,TIFR Mumbai
Subhankar Datta,IISER Pune
Suchira Sarkar,TIFR Mumbai
Supriyo Saha,TIFR Mumbai
Surhud More,IUCAA Pune
Susmita Adhikari,IISER Pune
Swanith Upadhye,TIFR Mumbai
Tushar Mudgal,IISER Pune
Vaidik Prasal,IISER Pune
Vikhyat Sharma,IISER Pune
Viswesh Marthi,NCRA Pune
Vivek Kumar Jha,NCRA Pune
Yash Dadhwal,IISER Pune
Yash Koushal,IISER Pune
Yogesh Wadadekar,NCRA Pune
Yogita Kumari,IUCAA Pune
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
