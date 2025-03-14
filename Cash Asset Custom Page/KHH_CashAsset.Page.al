page 50102 "KHH Cash Asset"
{
    PageType = Card;
    ApplicationArea = All;
    UsageCategory = Administration;
    Caption = 'Cash Asset';
    Editable = false;
    layout
    {
        area(Content)
        {
            usercontrol(CashAddInName; CashAddIn)
            {
                ApplicationArea = All;
                trigger AddInReady()
                begin
                    AddInIsReady := true;
                    Proceed();
                end;
            }
        }
    }

    /* trigger OnAfterGetCurrRecord()
    begin
        CurrRecLoaded := true;
        Proceed();
    end; */

    var
        AddInIsReady: Boolean;
        CurrRecLoaded: Boolean;

    procedure Proceed()
    var
        BalanceValue: Decimal;
        GLAccount: Record "G/L Account";
    begin
        if AddInIsReady then begin
            if GLAccount.Get(11110) then begin
                GLAccount.CalcFields(Balance);
                BalanceValue := GLAccount.Balance;
                CurrPage.CashAddInName.PassCashText(BalanceValue);
            end;
        end
        else
            exit;
    end;
}