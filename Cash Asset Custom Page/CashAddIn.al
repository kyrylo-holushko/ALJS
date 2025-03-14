controladdin CashAddIn
{
    //RequestedHeight = 600;
    MinimumHeight = 500;
    //MaximumHeight = 300;
    //RequestedWidth = 700;
    MinimumWidth = 700;
    //MaximumWidth = 700;
    VerticalStretch = true;
    VerticalShrink = true;
    HorizontalStretch = true;
    HorizontalShrink = true;
    StyleSheets = 'css/styling.css';
    Images = 'images/cash.png';
    StartupScript = 'js/start.js';
    /*     Scripts =
        'script1.js',
        'script2.js'; */

    /*     RecreateScript = 'recreateScript.js';
        RefreshScript = 'refreshScript.js'; */

    procedure PassCashText(value: Decimal);
    event AddInReady();
}