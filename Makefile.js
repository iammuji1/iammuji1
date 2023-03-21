include $(GLIB_MAKEFILE)

SUBDIRS = . docs data

ACLOCAL_AMFLAGS =

# Global C Flags
AM_CFLAGS = ${DBUS_CFLAGS}
AM_CXXFLAGS = \
	${DBUS_CFLAGS} \
	$(XML_CFLAGS) \
	$(UPOWER_CFLAGS) \
	$(EVDEV_CFLAGS) \
	-DTDRUNDIR=\"$(tdrundir)\" \
	-DTDCONFDIR=\"$(tdconfdir)\" \
	$(CXXFLAGS) \
	-I src

EXTRA_DIST=Makefile.glib \
	thermald.pc.in

# Programs to build
sbin_PROGRAMS = thermald

# Evaluate Table Application
thermald_CPPFLAGS = \
	-I@top_srcdir@/src \
	-DTDLOCALEDIR=\"$(datadir)/locale\" \
	-DGLIB_SUPPORT

thermald_includedir = @top_srcdir@
thermald_LDADD = \
	$(DBUS_LIBS) \
	$(GLIB_LIBS) \
	$(LIBNL_LIBS) \
	$(LIBM) \
	$(LIBDL) \
	$(XML_LIBS) \
	$(LZMA_LIBS) \
	$(UPOWER_LIBS) \
	$(EVDEV_LIBS)

BUILT_SOURCES = \
	thd_dbus_interface.h

thermald_SOURCES = \
	src/main.cpp \
	src/thd_dbus_interface.cpp \
	src/thd_engine.cpp \
	src/thd_cdev.cpp \
	src/thd_cdev_therm_sys_fs.cpp \
	src/thd_engine_default.cpp \
	src/thd_engine_adaptive.cpp \
	src/thd_sys_fs.cpp \
	src/thd_trip_point.cpp \
	src/thd_zone.cpp \
	src/thd_zone_cpu.cpp \
	src/thd_zone_therm_sys_fs.cpp \
	src/thd_zone_dynamic.cpp \
	src/thd_preference.cpp \
	src/thd_parse.cpp \
	src/thd_sensor.cpp \
	src/thd_sensor_virtual.cpp \
	src/thd_kobj_uevent.cpp \
	src/thd_cdev_order_parser.cpp \
	src/thd_cdev_gen_sysfs.cpp \
	src/thd_pid.cpp \
	src/thd_zone_generic.cpp \
	src/thd_cdev_cpufreq.cpp \
	src/thd_cdev_rapl.cpp \
	src/thd_cdev_intel_pstate_driver.cpp \
	src/thd_rapl_power_meter.cpp \
	src/thd_trt_art_reader.cpp \
	src/thd_cdev_rapl_dram.cpp \
	src/thd_cpu_default_binding.cpp \
	src/thd_cdev_backlight.cpp \
	src/thd_cdev_modem.cpp \
	src/thd_int3400.cpp \
	src/thd_cdev_kbl_amdgpu.cpp \
	src/thd_sensor_kbl_amdgpu_power.cpp \
	src/thd_sensor_kbl_amdgpu_thermal.cpp \
	src/thd_zone_kbl_g_mcp.cpp \
	src/thd_sensor_kbl_g_mcp.cpp \
	src/thd_zone_kbl_amdgpu.cpp \
	src/thd_sensor_rapl_power.cpp \
	src/thd_zone_rapl_power.cpp \
	src/thd_gddv.cpp

man5_MANS = man/thermal-conf.xml.5
man8_MANS = man/thermald.8

thd_dbus_interface.h: $(top_srcdir)/src/thd_dbus_interface.xml
	$(AM_V_GEN) dbus-binding-tool --prefix=thd_dbus_interface --mode=glib-server --output=$@ $<

CLEANFILES = $(BUILT_SOURCES)
