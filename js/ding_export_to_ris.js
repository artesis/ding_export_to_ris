(function ($) {
  'use strict';

  /**
   * Export in RIS-format functionality
   */
  function findIdsToExport() {
    let allIds = Drupal.settings.exportToRisBookmarks;

    // Clear selected id's.
    let selectedIds = [];
    // Final bookmarks collection for export.
    let collectedIds = [];
    $('.pane-bookmarks td :checkbox:not(".wrap_selector-processed")').each(function () {
      let $checkbox = $(this);
      if ($checkbox.attr('checked')) {
        // Get proper id from checked item.
        let parts = $checkbox.closest('tr').find('.group_user_list_content:first').attr('id').split('-');
        selectedIds.push(parts[parts.length - 1]);
      }
    });

    // Check if selected items exist in bookmarks array.
    for (let i = selectedIds.length - 1; i >= 0; i--) {
      let selectedId = selectedIds[i];

      for (let j = allIds.length - 1; j >= 0; j--) {
        let bookmarksId = allIds[j];

        if (bookmarksId.indexOf(selectedId) >= 0) {
          collectedIds.push(bookmarksId);
        }
      }
    }

    // If collected id's available.
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
  }

  Drupal.behaviors.exportToRIS = {
    attach: function (context) {
      // Export in RIS-format functionality.
      $('.export-to-ris', context).on('click', function (e) {
        e.preventDefault();
        findIdsToExport();
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
