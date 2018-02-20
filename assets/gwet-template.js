function constructColumnName(category) {
    return function (columnName) {
        return `${category}.${columnName}._text`
    }
}

//JSON path for the raw transformed object
let category = {
    event : '$.Online_Event.Event',
    agendas : '$.Online_Event.Event.Agendas.Agenda',
    speakers : '$.Online_Event.Event.Agendas.Agenda.Speakers.Speaker',
    contact: '$.Registration'
};

let constructEventColumn = constructColumnName(category.event);
let constructAgendasColumn = constructColumnName(category.agendas);
let constructSpeakersColumn = constructColumnName(category.speakers);
let constructContactColumn = constructColumnName(category.contact);

let gwetTemplate = {
    event: {
        event_id: constructEventColumn('Event_ID'),
        event_name: constructEventColumn('Event_Name'),
        country_name: constructEventColumn('Country_Name'),
        language_code: constructEventColumn('LanguageCode'),
        date: constructEventColumn('Date'),
        to_date: constructEventColumn('To_Date'),
        event_start_date: constructEventColumn('Start_Time'),
        event_end_date: constructEventColumn('End_Time'),
        timezone: constructEventColumn('TimeZone'),
        event_registration_link: constructEventColumn('Event_Reg_URL'),
        event_url: constructEventColumn('Event_URL'),
        event_description: constructEventColumn('Full_Description_HTML'),
        event_type: constructEventColumn('Event_Type'),
        ecme_credited: constructEventColumn('eCME_Credited'),
        calendar_invite: constructEventColumn('ICSURL'),
        reference_number_of_course: constructEventColumn('Event_ID')
    },
    agendas: {
        event_id: constructEventColumn('Event_ID'),
        agenda_id: constructAgendasColumn('Agenda_ID'),
        title: constructAgendasColumn('Title'),
        agenda_starttime: constructAgendasColumn('Agenda_Starttime')
    },
    speakers: {
        event_id: constructEventColumn('Event_ID'),
        agenda_id: constructAgendasColumn('Agenda_ID'),
        speaker_id: constructSpeakersColumn('Speaker_ID'),
        speaker_name: constructSpeakersColumn('Speaker_Name'),
        speaker_order: constructSpeakersColumn('Speaker_Order'),
        speaker_other_information: constructSpeakersColumn('Speaker_Other_information'),
        speaker_additional_information: constructSpeakersColumn('Speaker_Additional_information'),
        speaker_biography: constructSpeakersColumn('Speaker_Biography'),
        speaker_short_description: constructSpeakersColumn('Speaker_Short_Description'),
        speaker_biography_URL: constructSpeakersColumn('Speaker_Biography_URL'),
        
    },
    contact: {
        jr_id: constructContactColumn('MCID'),
        event_id: constructContactColumn('Event_ID'),
        first_name: constructContactColumn('First_Name'),
        last_name: constructContactColumn('Last_Name'),
        email: constructContactColumn('EMAILID'),
        event_user_id: constructContactColumn('UserID'),
        registered_time_date: constructContactColumn('RegisterDate'),
        waitlisted: constructContactColumn('Waitlisted'),
        attended_live: constructContactColumn('AttendedLive'),
        attended_archived_event: constructContactColumn('AttendedArchive'),
        ecme_status: constructContactColumn('eCME_STATUS'),
        ecme_number_of_credits_received: constructContactColumn('eCME_Credit'),
        ecme_certificate_downloadable: constructContactColumn('eCME_Cert'),
        link_to_certificate: constructContactColumn('eCME_Certlink'),
        status_event_registered: constructContactColumn('RegisterDate'),

    }

};
// status_event_accessed: AttendedLive | AttendedArchive | eCME_STATUS,

// gwetTemplate.event.event_start_date = gwetTemplate.event.date 
//                                       + ' ' 
//                                       + gwetTemplate.event.event_start_date;
// gwetTemplate.event.event_end_date = gwetTemplate.event.to_date 
//                                       + ' ' 
//                                       + gwetTemplate.event.event_end_date;
                                      
module.exports = {
    gwetTemplate
}
