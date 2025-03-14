page 50100 "KHH Item Card Part"
{
    PageType = CardPart;
    ApplicationArea = All;
    UsageCategory = Administration;
    SourceTable = "Item";

    layout
    {
        area(Content)
        {
            usercontrol(HSCodeName; HSCode)
            {

                trigger ControlAddInReady()
                begin
                    while not gotInitalRecord do begin
                    end;
                    AppendHtml();
                end;

                trigger HSCodeFieldFilled(newhscode: Code[10]; updateUI: Boolean)
                begin
                    Rec."HS Code" := newhscode;
                    Rec.Modify();
                    if updateUI then
                        CurrPage.HSCodeName.UpdateHSCodeUI(Rec."HS Code");
                end;
            }
        }
    }

    var
        gotInitalRecord: Boolean;

    trigger OnAfterGetCurrRecord()
    begin
        gotInitalRecord := true;
    end;

    procedure AppendHtml()
    begin
        CurrPage.HSCodeName.AppendHTML(Rec."HS Code");
    end;

}