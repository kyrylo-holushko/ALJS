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

        /**********  COMMENT OUT BELOW **********/

        /* addafter(Description)
        {
            field("New Description"; Rec."New Description")
            {
                ApplicationArea = All;
                Caption = 'New Description';
            }
        }

        addafter("Item Category Code")
        {
            field("Custom Category"; Rec."Custom Category")
            {
                ApplicationArea = All;
                Caption = 'Custom Category';
            }
        } */
    }
}