<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once dirname(__FILE__) . '/tcpdf/tcpdf.php';
class Pdf extends TCPDF
{

    function __construct()
    {
        parent::__construct();
    }

    /*
	public function Header() 
	{
    	$html = 'Some Header';
    	$this->SetFontSize(8);
    	$this->WriteHTML($html, true, 0, true, 0);
  	}
 
  	public function Footer() 
  	{
    	$this->SetY(-15);
    	$html = 'Some Footer';
    	$this->SetFontSize(8);
    	$this->WriteHTML($html, true, 0, true, 0);
  	}
  	*/

}