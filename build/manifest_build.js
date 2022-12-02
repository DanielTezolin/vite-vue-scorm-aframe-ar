import builder from "xmlbuilder";
import sco_options from "../sco.config";

export default function () {
  let manifest;
  return {
    name: "Generate manifest",
    buildStart() {
      var xmlObj = {
        manifest: {
          "@identifier": "com." + sco_options.name + "_SCS",
          "@version": "1.0",
          "@xmlns": "http://www.imsproject.org/xsd/imscp_rootv1p1p2",
          "@xmlns:adlcp": "http://www.adlnet.org/xsd/adlcp_rootv1p2",
          "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "@xsi:schemaLocation":
            "http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd",
          metadata: {
            schema: "ADL SCORM",
            schemaversion: "1.2",
            lom: {
              "@xmlns": "http://ltsc.ieee.org/xsd/LOM",
              "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
              "@xsi:schemaLocation": "http://ltsc.ieee.org/xsd/LOM lom.xsd",
              general: {
                title: {
                  string: {
                    "@language": "pt",
                    "#text": "SimpleCycleStudio",
                  },
                },
                language: "Português",
              },
              technical: {
                format: "text/html",
                requirement: {
                  orComposite: {
                    type: {
                      source: "LOMv1.0",
                      value: "browser",
                    },
                    name: {
                      source: "LOMv1.0",
                      value: "any",
                    },
                  },
                },
                otherPlatformRequirements: {
                  string: {
                    "@language": "pt",
                    "#text": "HTML5-compliant web browser",
                  },
                },
              },
              educational: {
                interactivityType: {
                  source: "LOMv1.0",
                  value: "active",
                },
                interactivityLevel: {
                  source: "LOMv1.0",
                  value: "very high",
                },
                intendedEndUserRole: {
                  source: "LOMv1.0",
                  value: "learner",
                },
                context: {
                  source: "LOMv1.0",
                  value: "school",
                },
                language: "pt",
              },
            },
          },
          organizations: {
            "@default": "com." + sco_options.organizations,
            organization: {
              "@identifier": "com." + sco_options.organizations,
              title: sco_options.name,
              item: {
                "@identifier": "com." + sco_options.name + "_SCS",
                "@identifierref": "scs_resource",
                "@isvisible": "true",
                title: sco_options.name,
                "adlcp:masteryscore": sco_options.score,
              },
            },
          },
          resources: {
            resource: {
              "@identifier": "scs_resource",
              "@type": "webcontent",
              "@adlcp:scormtype": "sco",
              "@href": "/index.html",
              file: {
                "@href": "/index.html",
              },
            },
          },
        },
      };

      var xml = builder.create(xmlObj, { encoding: "utf-8" });
      manifest = xml.end({ pretty: true });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "imsmanifest.xml",
        source: manifest,
      });
    },
  };
}
