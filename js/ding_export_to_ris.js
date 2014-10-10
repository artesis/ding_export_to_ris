(function($) {
  'use strict';

  /**
   * Export to ris functionality
   *
   * @param  event e clicked button event.
   */
  function findIdsToExport(e) {
    // Clear id's.
    var ids = [];

    $('.pane-bookmarks :checkbox:not(".wrap_selector-processed")').each(function() {
      var $checkbox = $(this);

      if ($checkbox.attr('checked') === true) {
        // Get proper id from checked item.
        var id = $checkbox.closest('tr').find('.group_user_list_content:first')
                .attr('id')
                .replace(/[A-Za-z$_]/g, '').replace(/-/g, '-basis:');

        // Push current id to id's list.
        ids.push(id);
      }
    });

    // If id's available.
    if (ids.length !== 0) {
      ids = ids.join(';');
      $('.export-to-ris').attr('href', 'http://bibliotek.dk/da/export/cart/ris/' + ids).removeClass('hidden');
    }
    else {
      e.preventDefault();

      // Open error popup.
      Drupal.ding_popup.open({
        title: Drupal.t('Action required'),
        data: Drupal.t('You should select at least one item')
      });
    }
  }

  // On document ready.
  $(function() {
    // Export to ris button.
    $('<a>', {
      'href': '#',
      'class': 'export-to-ris',
      'target': '_blank',
      'text': Drupal.t('Export to RIS-format')
    }).insertBefore('.pane-bookmarks .d-reservations-delete');

    // Export to ris functionality.
    $('.export-to-ris').live('click', function(e) {
      findIdsToExport(e);
    });
  });
})(jQuery);
