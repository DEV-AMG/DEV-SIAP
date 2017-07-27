<?php

class MUploadKehadiran extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	function isPeriode()
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi FROM tm_referensi
			WHERE fs_kode_referensi = 'periode_absensi'
		");
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function checkFileExist($sKdCabang)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_filename FROM tx_uploadfile
			WHERE fs_flag_deleted = '0' AND fs_kode_cabang = '".trim($sKdCabang)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function deleteAllByMonth($sKdCabang, $sPeriode)
	{
		$xSQL = ("
			DELETE FROM tx_checkinout WHERE fs_kode_cabang = '".trim($sKdCabang)."' AND fd_checktime LIKE '".trim($sPeriode)."%';
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listKehadiranAll($sCari,$sKdCabang)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama, fd_checktime
			FROM tx_checkinout
			WHERE fs_kode_cabang = '".trim($sKdCabang)."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				AND fs_nama LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	function listKehadiran($sCari,$sKdCabang,$nStart,$nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nama, fd_checktime
			FROM tx_checkinout
			WHERE fs_kode_cabang = '".trim($sKdCabang)."'
		");

		if (trim($sCari) <> '')
		{
			$xSQL = $xSQL.("
				AND fs_nama LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}