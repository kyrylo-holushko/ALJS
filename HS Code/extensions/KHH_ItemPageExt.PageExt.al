pageextension 50101 "KHH Item Page Ext" extends "Item Card"
{
    layout
    {
        addlast(ForeignTrade)
        {
            part(ItemCartPartName; "KHH Item Card Part")
            {
                Caption = ' ';
                ApplicationArea = All;
                SubPageLink = "No." = FIELD("No.");
            }
        }
    }
}