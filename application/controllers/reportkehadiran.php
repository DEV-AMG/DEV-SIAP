<?php

class Reportkehadiran extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function index()
	{
		if (trim($this->session->userdata('gUserLevel')) <> '')
		{
			$this->load->view('vreportkehadiran');
		}
		else
		{
			redirect('login','site_url');
		}
	}

	function gridreport()
	{
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$mmyy = trim(substr($this->input->post('fd_mmyy'), 0, 10));
		$cari = trim($this->input->post('fs_cari'));
		$this->db->query(NOLOCK);
		$this->load->model('mReportKehadiran');
		$sSQL = $this->mReportKehadiran->listReportAll($mmyy, $cari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->mReportKehadiran->listReport($mmyy, $cari, $nStart, $nLimit);
		$this->db->query(NOLOCK2);
		$xArr = array();
		if ($sSQL->num_rows() > 0)
		{
			foreach ($sSQL->result() as $xRow)
			{
				$xArr[] = array(
						'fs_kode_cabang' => ascii_to_entities(trim($xRow->fs_kode_cabang)),
						'fs_nama' => ascii_to_entities(trim($xRow->fs_nama)),
						'fd_tanggal' => ascii_to_entities(trim($xRow->tanggal)),
						'fd_masuk' => ascii_to_entities(trim(date('H:i', strtotime($xRow->masuk)))),
						'fd_keluar' => ascii_to_entities(trim(date('H:i', strtotime($xRow->keluar)))),
						'fn_jam' => ascii_to_entities(trim($xRow->jam))
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

}