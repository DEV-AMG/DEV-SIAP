<?php

class MReportKehadiran extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function listReportAll($sMY, $sCari)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama, date(fd_checktime) AS tanggal, 
			min(fd_checktime) AS masuk, 
			max(fd_checktime) AS keluar, 
			TIMESTAMPDIFF(HOUR, min(fd_checktime), max(fd_checktime)) AS jam 
			FROM tx_checkinout 
			WHERE MONTH(fd_checktime) = MONTH('".trim($sMY)."')
			AND YEAR(fd_checktime) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
				AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");

			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
					AND (fs_nama LIKE '%".trim($sCari)."%')
				");
			}

		}

		$xSQL = $xSQL.("
			GROUP BY tanggal, fs_nama
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listReport($sMY, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama, date(fd_checktime) AS tanggal, 
			min(fd_checktime) AS masuk, 
			max(fd_checktime) AS keluar, 
			TIMESTAMPDIFF(HOUR, min(fd_checktime), max(fd_checktime)) AS jam 
			FROM tx_checkinout
			WHERE MONTH(fd_checktime) = MONTH('".trim($sMY)."')
			AND YEAR(fd_checktime) = YEAR('".trim($sMY)."')
		");

		if ($this->session->userdata('gKodeCabang') != '00') {
			$xSQL = $xSQL.("
			AND fs_kode_cabang = '".trim($this->session->userdata('gKodeCabang'))."'	
			");

			if (trim($sCari) <> '')
			{
				$xSQL = $xSQL.("
					AND (fs_nama LIKE '%".trim($sCari)."%')
				");
			}
		}
		
		$xSQL = $xSQL.("
			GROUP BY tanggal, fs_nama
			ORDER BY tanggal ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}