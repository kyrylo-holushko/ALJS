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
        /**********  COMMENT OUT BELOW **********/
        /* field(50105; "New Description"; Text[100])
        {
            Caption = 'New Description';
            DataClassification = ToBeClassified;
        }

        field(50120; "Custom Category"; Code[20])
        {
            Caption = 'Custom Category';
            DataClassification = ToBeClassified;

            trigger OnValidate()
            var
                IsHandled: Boolean;
            begin
                IsHandled := false;
                OnBeforeValidateCustomCategory(Rec, xRec, IsHandled);
                If IsHandled then
                    exit;

                TestNoOpenEntriesExist("Custom Category");
            end;
        }

        modify(Description)
        {
            trigger OnAfterValidate()
            begin
                Rec."Search Description" := Rec.Description + '*';
            end;
        } */
    }

    /* [IntegrationEvent(false, false)]
    local procedure OnBeforeValidateCustomCategory(var Item: Record Item; xItem: Record Item; var IsHandled: Boolean)
    begin

    end; */
}