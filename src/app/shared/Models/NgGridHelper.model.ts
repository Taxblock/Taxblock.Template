export class NgGridHelper
{
    timeOut = 500;

    public EditNextCell(grd: any, rowIndex: number, currentColumnName: string, _timeout?: number) {
        setTimeout(() => {
            try {
                if(_timeout != null)
                {
                    this.timeOut = _timeout;
                }
                let visibleColumns = grd.columnModel.filter(x => x.visible == true);
                let propertyIndex = visibleColumns.findIndex(x => x.field == currentColumnName);
                if (visibleColumns.length > propertyIndex + 1) {
                    grd.editCell(rowIndex, visibleColumns[propertyIndex + 1].field);
                }
            }
            catch{
            }
        }, this.timeOut);
    }
}