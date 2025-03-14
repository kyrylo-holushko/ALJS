controladdin HSCode
{
    RequestedHeight = 300;
    MinimumHeight = 300;
    //MaximumHeight = 300;
    //RequestedWidth = 700;
    //MinimumWidth = 700;
    //MaximumWidth = 700;
    VerticalStretch = true;
    VerticalShrink = true;
    HorizontalStretch = true;
    HorizontalShrink = true;
    StartupScript = 'js/start.js';
    StyleSheets = 'css/style.css';

    event ControlAddInReady();

    event HSCodeFieldFilled(newhscode: Code[10]; updateUI: Boolean);
    procedure AppendHTML(oldhscode: Code[10]);

    procedure UpdateHSCodeUI(updatedhscode: Code[10]);
}