tableextension 50100 "KHH Item Table Ext" extends "Item"
{
    fields
    {
        field(111; "HS Code"; Code[10])
        {
            DataClassification = ToBeClassified;
            Description = 'Canadian HS Code';
            Caption = 'HS Code';
        }
    }
}