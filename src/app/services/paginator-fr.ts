import { MatPaginatorIntl } from '@angular/material/paginator';

export class PaginatorIntlProvider extends MatPaginatorIntl {

    firstPageLabel = 'Première page';
    itemsPerPageLabel = 'Éléments par page';
    lastPageLabel = 'Dernière page';
    nextPageLabel = 'Prochaine page';
    previousPageLabel = 'Page précédente';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 sur ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} sur ${length}`;
    }

}
