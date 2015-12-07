(function($) {
  'use strict';

  /**
   * Export to ris functionality
   */
  function findIdsToExport() {
    var allIds = Drupal.settings.exportToRisBookmarks;
    var buttonUrl = Drupal.settings.exportToRisUrl;
    // Clear selected id's.
    var selectedIds = [];
    // Final bookmars collection for export.
    var collectedIds = [];

    $('.pane-bookmarks :checkbox:not(".wrap_selector-processed")').each(function() {
      var $checkbox = $(this);
      if ($checkbox.attr('checked') === true) {
        // Get proper id from checked item.
        var parts = $checkbox.closest('tr').find('.group_user_list_content:first').attr('id').split('-');
        selectedIds.push(parts[parts.length - 1]);
      }
    });

    // Check if selected items exist in bookmarks array.
    for (var i = selectedIds.length - 1; i >= 0; i--) {
      var selectedId = selectedIds[i];

      for (var j = allIds.length - 1; j >= 0; j--) {
        var bookmarksId = allIds[j];

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

  // On document ready.
  $(function() {

    // Export to ris functionality.
    $('.export-to-ris').live('click', function(e) {
      e.preventDefault();
      findIdsToExport();
    });

    // Export to ris functionality.
    $('.export-to-ris-btn').live('click', function(e) {
      e.preventDefault();
      var tid = $(this).data('tid');

      if (tid.length != 0)
        window.location.href = Drupal.settings.exportToRisUrl + tid;
    });
  });
})(jQuery);
