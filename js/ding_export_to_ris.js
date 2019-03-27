(function ($) {
  'use strict';

  Drupal.behaviors.exportToRIS = {
    attach: function (context) {
      // Export in RIS-format functionality.
      $('.export-to-ris', context).on('click', function (e) {
        e.preventDefault();

        let collectedIds = [];
        $('tr.selected').find('.export-to-ris-btn').each(function () {
          let tid = $(this).data('tid');
          if (tid.length !== 0) {
            collectedIds.push(tid);
          }
        });

        if (collectedIds.length !== 0) {
          collectedIds = collectedIds.join(';');
          window.location.href = Drupal.settings.exportToRisUrl + collectedIds;
        }
        else {
          // Open error popup.
          Drupal.ding_popup.open({
            title: Drupal.t('Action required'),
            data: Drupal.t('You should select at least one item')
          });
        }
      });

      // Export in RIS-format functionality.
      $('.export-to-ris-btn', context).on('click', function (e) {
        e.preventDefault();
        let tid = $(this).data('tid');

        if (tid.length !== 0) {
          window.location.href = Drupal.settings.exportToRisUrl + tid;
        }
      });
    }
  };
})(jQuery);
